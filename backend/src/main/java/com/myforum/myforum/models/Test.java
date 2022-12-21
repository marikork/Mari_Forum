package com.myforum.myforum.models;

//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
@Entity
@Table(name="Test")
public class Test {
    private Long id;
    private String name;
    public void setId(Long id) {
        this.id = id;
    }
    @Id
    public Long getId() {
        return id;
    }
    public void setName(String name){
        this.name = name;
    }
    @NotBlank
    public String getName(){
        return name;
    }
}
