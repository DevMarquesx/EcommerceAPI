package com.ecommerce.api.model;

import com.ecommerce.api.dto.CartaoDto;
import com.ecommerce.api.dto.ProdutosDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "Cartoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome_cart;
    private String numero_cart;
    private String val_cart;
    private String cvv_cart;

    public CartaoModel(CartaoDto Dto)  {
        this.nome_cart = Dto.nome_cart();
        this.numero_cart = Dto.numero_cart();
        this.val_cart = Dto.val_cart();
        this.cvv_cart = Dto.cvv_cart();
    }
}
