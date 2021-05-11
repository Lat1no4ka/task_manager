
package com.server.task.repo;

import com.server.task.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, String> {
    List<Message> findBySenderAndReceiver(String sender,String receiver);
    List<Message> findByReceiverIsNull();
}
