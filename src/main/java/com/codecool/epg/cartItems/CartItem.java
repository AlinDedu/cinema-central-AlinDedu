package com.codecool.epg.cartItems;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer userId;
    private String movieTitle;
    private String imdbId;
    private String production;
    private Integer quantity;
    private Integer pricePerPiece;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
