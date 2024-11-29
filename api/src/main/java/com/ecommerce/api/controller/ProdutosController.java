package com.ecommerce.api.controller;

import com.ecommerce.api.dto.ProdutosDto;
import com.ecommerce.api.model.ProdutosModel;
import com.ecommerce.api.repository.ProdutosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("prod")
public class ProdutosController {

    @Autowired
    ProdutosRepository repo;

    @GetMapping
    public ResponseEntity getAll() {
        return ResponseEntity.ok(repo.findAll());
    }
    @GetMapping("/prod/{id}")
    public ResponseEntity<ProdutosModel> getProdutoById(@PathVariable UUID id) {
        Optional<ProdutosModel> produto = repo.findById(id);
        if (produto.isPresent()) {
            return new ResponseEntity<>(produto.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ProdutosModel> criarProduto(@RequestBody ProdutosDto produtosDto) {
        ProdutosModel produtos = new ProdutosModel(produtosDto);
        repo.save(produtos);
        return ResponseEntity.status(201).body(produtos);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProdutosModel> atualizarProduto(@PathVariable UUID id, @RequestBody ProdutosDto produtosDto) {
        Optional<ProdutosModel> ProdutosExistentes = repo.findById(id);

        if (ProdutosExistentes.isPresent()) {
            ProdutosModel produtos = ProdutosExistentes.get();
            produtos.setNome(produtosDto.nome());
            produtos.setDescricao(produtosDto.descricao());
            produtos.setPreco(produtosDto.preco());
            produtos.setFoto(produtosDto.foto());

            repo.save(produtos);
            return ResponseEntity.ok(produtos);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable UUID id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}