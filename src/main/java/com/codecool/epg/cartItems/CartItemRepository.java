package com.codecool.epg.cartItems;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByUserId(Integer userId);
    boolean existsByUserIdAndMovieTitle(Integer userId, String movieTitle);
}
