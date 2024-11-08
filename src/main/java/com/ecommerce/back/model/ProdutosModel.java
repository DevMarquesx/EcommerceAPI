package com.ecommerce.back.model;

import com.ecommerce.back.dto.ProdutosDto;
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
    private double preco;
    private String foto;
    private int nota;

    public ProdutosModel(ProdutosDto Dto)  {
       this.nome = Dto.nome();
       this.descricao = Dto.descricao();
       this.preco = Dto.preco();
       this.foto = Dto.foto();
       this.nota = Dto.nota();
    }
}
