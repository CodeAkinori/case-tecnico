package com.painel.backend.repository;

import com.painel.backend.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    // Você pode adicionar métodos de filtragem aqui, ex:
    // List<Venda> findByVendedor(String vendedor);
}
