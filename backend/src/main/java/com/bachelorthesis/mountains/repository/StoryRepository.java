package com.bachelorthesis.mountains.repository;

import com.bachelorthesis.mountains.model.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends MongoRepository<Story, String> {

    Story findByTitle(String title);
    Story findByUserId(String id);
}