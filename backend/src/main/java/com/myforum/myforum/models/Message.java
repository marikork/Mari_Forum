package com.myforum.myforum.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import com.myforum.myforum.models.Topic;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "message")
public class Message {

    @Id
    @SequenceGenerator(name="message_id_seq", sequenceName = "message_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "message_id_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "writer")
    private String writer;

    @Column(name = "message")
    private String message;

    @Column(name = "topic_id")
    private Long topicId;
    
}
