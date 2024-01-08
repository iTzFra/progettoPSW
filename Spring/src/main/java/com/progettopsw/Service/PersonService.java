package com.progettopsw.Service;

import com.progettopsw.DTO.PersonDTO.AddPersonDTO;
import com.progettopsw.DTO.PersonDTO.UpdatePersonDTO;
import com.progettopsw.Entity.Person;
import com.progettopsw.Exception.PersonException.PersonAlreadyExistException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Other.Util;
import com.progettopsw.Repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    ModelMapper modelMapper;

    public Person getLoggedPerson() throws PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        return personRepository.findByEmail(email);
    }

    public void addPerson(AddPersonDTO addPersonDTO) throws PersonAlreadyExistException {
        if (personRepository.existsByEmail(addPersonDTO.getEmail())) {
            throw new PersonAlreadyExistException("Person already exist");
        }
        addPersonKeycloak(addPersonDTO.getEmail(), addPersonDTO.getPassword());
        Person person = modelMapper.map(addPersonDTO, Person.class);
        personRepository.save(person);
    }

    public List<Person> showPersons(int pageNumber, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Person> pagedResult = personRepository.findAll(paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }

    public List<Person> showPersonsByEmail(int pageNumber, int pageSize, String sortBy, String email) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Person> pagedResult = personRepository.findByEmailContaining(email, paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }

    public void updatePerson(UpdatePersonDTO updatePersonDTO) throws PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        modelMapper.map(updatePersonDTO, person);
    }

    public void addPersonKeycloak(String username, String password) {
        String client = "progettoPSW";
        String realm = "progettoPSW";
        String usernameRealm = "admin";
        String passwordRealm = "admin";
        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl("http://localhost:8080")
                .realm(realm)
                .clientId(client)
                .username(usernameRealm)
                .password(passwordRealm)
                .build();
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(username);
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersRessource = realmResource.users();
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);
        Response response = usersRessource.create(user);
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource userResource = usersRessource.get(userId);
        userResource.resetPassword(passwordCred);
        ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(client).get(0);
        RoleRepresentation userClientRole = realmResource.clients().get(clientRepresentation.getId()).roles().get("user").toRepresentation();
        userResource.roles().clientLevel(clientRepresentation.getId()).add(Collections.singletonList(userClientRole));
    }

}
