package com.ecommerce.api.repository;

import com.ecommerce.api.model.CartaoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartaoRepository extends JpaRepository<CartaoModel, UUID> {
}
