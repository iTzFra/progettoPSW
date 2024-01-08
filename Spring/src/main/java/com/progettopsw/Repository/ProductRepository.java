package com.progettopsw.Repository;

import com.progettopsw.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByCode(long code);

    Product findById(long id);

    boolean existsById(long id);

    Page<Product> findByProductNameContaining(String productName, Pageable pageable);

    Page<Product> findAll(Pageable pageable);

}
