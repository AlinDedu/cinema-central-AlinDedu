package com.codecool.epg.controller;

import com.codecool.epg.cartItems.CartItem;
import com.codecool.epg.cartItems.CartItemRequest;
import com.codecool.epg.service.CartItemService;
import com.codecool.epg.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart-items")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CartItemController {
    private final CartItemService cartItemService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItemsByUsername(@RequestParam String username) {
        Optional<User> user = cartItemService.getUserByUsername(username);
        if (user.isPresent()) {
            List<CartItem> items = cartItemService.getCartItemsByUserId(user.get().getId());
            return ResponseEntity.ok(items);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestBody CartItemRequest request) {
        Optional<User> user = cartItemService.getUserByUsername(request.getUsername());

        if (user.isPresent()) {
            boolean cartItemExists = cartItemService.doesCartItemExist(user.get().getId(), request.getMovieTitle());

            if (cartItemExists) {
                return ResponseEntity.badRequest().build();
            } else {
                cartItemService.addCartItem(request, user.get());
                return ResponseEntity.ok("Item created");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{cartItemId}")
    public ResponseEntity<String> updateCartItem(@PathVariable Integer cartItemId, @RequestParam Integer quantity) {
        Optional<CartItem> itemOptional = cartItemService.getCartItemById(cartItemId);
        if (itemOptional.isPresent()) {
            CartItem item = itemOptional.get();
            cartItemService.updateCartItemQuantity(item, quantity);
            return ResponseEntity.ok("Item updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Integer cartItemId) {
        Optional<CartItem> item = cartItemService.getCartItemById(cartItemId);
        if (item.isPresent()) {
            cartItemService.deleteCartItem(item.get());
            return ResponseEntity.ok("Item deleted from the list");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
