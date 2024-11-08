package com.ecommerce.back.dto;

public record ProdutosDto(String nome, String descricao,
                          double preco, String foto, int nota) {
}
