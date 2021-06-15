<?php

require_once dirname(__DIR__).'/vendor/autoload.php';
include_once("Question.php");

final class SORequest
{
    private $order;
    private $sort;
    private $accepted;
    private $answers;
    private $closed;
    private $tagged;
    private $site;

    /**
     * SORequest constructor.
     * @param $order
     * @param $sort
     * @param $accepted
     * @param $answers
     * @param $closed
     * @param $tagged
     * @param $site
     */
    public function __construct($order, $sort, $accepted, $answers, $closed, $tagged, $site)
    {
        $this->order = $order;
        $this->sort = $sort;
        $this->accepted = $accepted;
        $this->answers = $answers;
        $this->closed = $closed;
        $this->tagged = $tagged;
        $this->site = $site;
    }

    /**
     * @return String
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * @return mixed
     */
    public function getSort()
    {
        return $this->sort;
    }

    /**
     * @return mixed
     */
    public function getAccepted()
    {
        return $this->accepted;
    }

    /**
     * @return mixed
     */
    public function getAnswers()
    {
        return $this->answers;
    }

    /**
     * @return mixed
     */
    public function getClosed()
    {
        return $this->closed;
    }

    /**
     * @return mixed
     */
    public function getTagged()
    {
        return $this->tagged;
    }

    /**
     * @return mixed
     */
    public function getSite()
    {
        return $this->site;
    }

    public function sendRequest()
    {
        $url =
            "https://api.stackexchange.com/2.2/search/advanced?".
            "order=$this->order".
            "&sort=$this->sort".
            "&accepted=$this->accepted".
            "&answers=$this->answers".
            "&closed=$this->closed".
            "&tagged=$this->tagged".
            "&site=$this->site";

        $client = new \GuzzleHttp\Client();
        try {
            $response = $client->request('GET', $url,
                ['headers' => ['Accept'=> 'application/json']
                ]);
            if ($response->getStatusCode() == 200) {
                $items = json_decode($response->getBody());
                $questions = array();
                foreach($items->items as $item) {
                    array_push($questions, new Question($item->link,$item->title, $item->creation_date,
                        $item->answer_count, $item->score, $item->view_count, $item->owner->reputation, $item->tags));
                }
                return $questions;
            }
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            echo 'Error: Could not get requested question. Source:'.get_class($this);

        }

    }





}