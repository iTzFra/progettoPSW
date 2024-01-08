package com.progettopsw.Repository;

import com.progettopsw.Entity.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, Long> {

    CartProduct findById(long id);

    boolean existsById(long id);

}
