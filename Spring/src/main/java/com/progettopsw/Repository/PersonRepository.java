package com.progettopsw.Repository;

import com.progettopsw.Entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    boolean existsByEmail(String email);

    Person findById(long id);

    boolean existsById(long id);

    Page<Person> findAll(Pageable pageble);

    Person findByEmail(String email);

    Page<Person> findByEmailContaining(String email, Pageable pageable);

}
