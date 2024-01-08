package com.progettopsw.Service;

import com.progettopsw.DTO.ProductDTO.AddProductDTO;
import com.progettopsw.DTO.ProductDTO.UpdateProductDTO;
import com.progettopsw.Entity.Cart;
import com.progettopsw.Entity.CartProduct;
import com.progettopsw.Entity.Product;
import com.progettopsw.Exception.ProductException.ProductAlreadyExistException;
import com.progettopsw.Exception.ProductException.ProductNotFoundException;
import com.progettopsw.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    public void addProduct(AddProductDTO addProductDTO) throws ProductAlreadyExistException {
        if (productRepository.existsByCode(addProductDTO.getCode())) {
            throw new ProductAlreadyExistException("Product already exist");
        }
        Product product = modelMapper.map(addProductDTO, Product.class);
        productRepository.save(product);
    }

    public void updateProduct(UpdateProductDTO updateProductDTO) throws ProductNotFoundException {
        if (!productRepository.existsById(updateProductDTO.getId())) {
            throw new ProductNotFoundException("Product not found");
        }
        Product product = productRepository.findById(updateProductDTO.getId());
        if (updateProductDTO.getPrice() != product.getPrice()) {
            for (CartProduct cartProduct : product.getCartProducts()) {
                Cart cart = cartProduct.getCart();
                cart.setTotal(cart.getTotal() - (cartProduct.getQuantity() * product.getPrice()) + (cartProduct.getQuantity()) * updateProductDTO.getPrice());
            }
        }
        modelMapper.map(updateProductDTO, product);
    }

    public List<Product> showProducts(int pageNumber, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = productRepository.findAll(paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }

    public List<Product> showProductsByProductName(int pageNumber, int pageSize, String sortBy, String productName) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = productRepository.findByProductNameContaining(productName, paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }

}
