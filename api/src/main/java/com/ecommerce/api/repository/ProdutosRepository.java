package com.ecommerce.api.repository;

import com.ecommerce.api.model.ProdutosModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProdutosRepository  extends JpaRepository<ProdutosModel, UUID> {
}
