package com.progettopsw.Repository;

import com.progettopsw.Entity.PersonOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonOrderRepository extends JpaRepository<PersonOrder, Long> {

    PersonOrder findById(long id);

    boolean existsById(long id);

}
