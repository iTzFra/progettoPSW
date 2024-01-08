package com.progettopsw.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPersonOrderRepository extends JpaRepository<com.progettopsw.Entity.ProductPersonOrder, Long> {

}
