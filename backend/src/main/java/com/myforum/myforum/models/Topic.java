package com.myforum.myforum.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
//import jakarta.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
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

    @OneToMany(targetEntity = Message.class, cascade = CascadeType.ALL)
    // name = topic_id (kannassa Message -taulun topic_id, johon viitataan)
    // referencedColumnName = "id" tämän pojon id
    @JoinColumn(name="topic_id", referencedColumnName = "id")
    private List<Message> messages;

    @Column(name = "time_created")
    private ZonedDateTime timeCreated;
    
}
