package com.myforum.myforum.models;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import com.myforum.myforum.models.Topic;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @SequenceGenerator(name="message_id_seq", sequenceName = "message_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "message_id_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    /*
    @Column(name = "topic_Id")
    private Integer topic_Id;
    */
    @Column(name = "writer")
    private String writer;

    @Column(name = "message")
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false, insertable = true)
    private Topic topic;

    /*
    public Integer getTopic_Id() {
        return topic_Id;
    }

    public void setTopic_Id(Integer topic_Id) {
        this.topic_Id = topic_Id;
    }

     */

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }


    public Message(){

    }

    public Message(Integer topic_Id, String writer, String message) {
        //this.topic_Id = topic_Id;
        this.writer = writer;
        this.message = message;
    }

    public Message(Topic topic, String writer, String message) {
        this.topic = topic;
        this.writer = writer;
        this.message = message;
    }

    /*
    public Integer getTopicId() {
        return topic_Id;
    }
    */

    /*
    public Topic getTopic() {
        return topic;
    }

    public String getWriter() {
        return writer;
    }

    public String getMessage() {
        return message;
    }
    */
    /*
    public void setTopicId(Integer topic_Id) {
        this.topic_Id = topic_Id;
    }
    */

    /*
    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    */
}
