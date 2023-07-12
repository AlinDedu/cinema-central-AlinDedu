package com.codecool.epg.cartItems;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemRequest {
    private String username;
    private String movieTitle;
    private String imdbId;
    private String production;
    private Integer quantity;
    private Integer pricePerPiece;
}
