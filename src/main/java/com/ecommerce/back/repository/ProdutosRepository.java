package com.ecommerce.back.repository;

import com.ecommerce.back.model.ProdutosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProdutosRepository extends JpaRepository<ProdutosModel, UUID> {}