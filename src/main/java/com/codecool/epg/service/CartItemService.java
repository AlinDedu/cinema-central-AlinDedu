package com.codecool.epg.service;

import com.codecool.epg.cartItems.CartItem;
import com.codecool.epg.cartItems.CartItemRepository;
import com.codecool.epg.cartItems.CartItemRequest;
import com.codecool.epg.user.User;
import com.codecool.epg.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<CartItem> getCartItemsByUserId(Integer userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public boolean doesCartItemExist(Integer userId, String movieTitle) {
        return cartItemRepository.existsByUserIdAndMovieTitle(userId, movieTitle);
    }

    public void addCartItem(CartItemRequest request, User user) {
        CartItem item = CartItem.builder()
                .userId(user.getId())
                .pricePerPiece(request.getPricePerPiece())
                .quantity(request.getQuantity())
                .movieTitle(request.getMovieTitle())
                .imdbId(request.getImdbId())
                .production(request.getProduction())
                .build();
        cartItemRepository.save(item);
    }

    public Optional<CartItem> getCartItemById(Integer cartItemId) {
        return cartItemRepository.findById(cartItemId);
    }

    public void updateCartItemQuantity(CartItem item, Integer quantity) {
        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    public void deleteCartItem(CartItem item) {
        cartItemRepository.delete(item);
    }
}
