package com.myforum.myforum.models;
import javax.validation.constraints.NotBlank;
import jakarta.persistence.*;

@Entity
@Table(name = "Topic")
public class Topic {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    //@Column(name = "creator")
    @NotBlank
    private String creator;

    /*
    @Column(name = "content")
    private String content;

    public Topic() {

    }
    public Topic(String creator, String content) {
        this.creator = creator;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Topic [id=" + id + ", creator=" + creator + ", content=" + content + "]";
    }
    */

}
