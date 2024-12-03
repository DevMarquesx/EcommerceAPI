package com.ecommerce.api.controller;

import com.ecommerce.api.dto.CartaoDto;
import com.ecommerce.api.model.CartaoModel;
import com.ecommerce.api.repository.CartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("cart")
public class CartaoController {

    @Autowired
    CartaoRepository repo;

    @PostMapping
    public ResponseEntity<CartaoModel> criarCartao(@RequestBody CartaoDto cartaoDto) {
        CartaoModel cartao = new CartaoModel(cartaoDto);
        repo.save(cartao);
        return ResponseEntity.status(201).body(cartao);
    }
}
