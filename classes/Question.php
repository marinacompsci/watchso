<?php

/**
 * Class that represents an unanswered Question from StackOverflow
 */
final class Question
{
    private $link;
    private $title;
    private $creation_date;
    private $answer_count;
    private $score;
    private $view_count;
    private $owner;
    private $tags;

    /**
     * Question constructor.
     * @param $link
     * @param $title
     * @param $creation_date
     * @param $answer_count
     * @param $score
     * @param $view_count
     * @param $owner
     * @param $tags
     */
    public function __construct($link, $title, $creation_date, $answer_count, $score, $view_count, $owner, $tags)
    {
        $this->link = $link;
        $this->title = $title;
        $this->creation_date = $creation_date;
        $this->answer_count = $answer_count;
        $this->score = $score;
        $this->view_count = $view_count;
        $this->owner = $owner;
        $this->tags = $tags;
    }

    /**
     * @return mixed
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return mixed
     */
    public function getCreationDate()
    {
        return $this->creation_date;
    }

    /**
     * @return mixed
     */
    public function getAnswerCount()
    {
        return $this->answer_count;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @return mixed
     */
    public function getViewCount()
    {
        return $this->view_count;
    }

    /**
     * @return mixed
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @return mixed
     */
    public function getTags()
    {
        return $this->tags;
    }




}