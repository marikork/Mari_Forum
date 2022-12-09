package com.myforum.myforum.models;
import javax.validation.constraints.NotBlank;
import jakarta.persistence.*;

@Entity
@Table(name = "topic")
public class Topic {

    @Id
    @SequenceGenerator(name="topic_id_seq", sequenceName = "topic_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "topic_id_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "creator")
    private String creator;

    @Column(name = "content")
    private String content;

    public Topic() {

    }
    public Topic(String creator, String content) {
        this.creator = creator;
        this.content = content;
    }

    /*
    public void setId(Long id) {
        this.id = id;
    }
    @Id
    public Long getId() {
        return id;
    }
    */

    public void setCreator(String creator){
        this.creator = creator;
    }
    @NotBlank
    public String getCreator(){
        return creator;
    }

    public void setContent(String content){
        this.content = content;
    }
    @NotBlank
    public String getContent(){
        return content;
    }


}
