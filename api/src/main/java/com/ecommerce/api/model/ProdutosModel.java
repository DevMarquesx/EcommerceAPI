package com.ecommerce.api.model;

import com.ecommerce.api.dto.ProdutosDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table (name = "Produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProdutosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome;
    private String descricao;
    private String preco;
    private String foto;

    public ProdutosModel(ProdutosDto Dto)  {
        this.nome = Dto.nome();
        this.descricao = Dto.descricao();
        this.preco = Dto.preco();
        this.foto = Dto.foto();
    }
}