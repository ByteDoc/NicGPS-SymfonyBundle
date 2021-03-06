<?php
namespace Bytedoc\Bundle\Gps\Entity;

class Webressource
{
    protected $id;

    protected $guid;

    protected $category;

    protected $title;

    protected $href;

    protected $rating;

    /**
     * @var \Bytedoc\Bundle\Gps\Entity\User
     */
    private $user;

	
	/**
	 * Copy attributes from another object
	 * @param Webressource $copy
	 * @return Webressource
	 */
	 public function copyAllAttributes($copy)
	 {
		 $this->setGuid($copy->getGuid());
		 $this->setCategory($copy->getCategory());
		 $this->setTitle($copy->getTitle());
		 $this->setHref($copy->getHref());
		 $this->setRating($copy->getRating());
		 
		 return $this;
	 }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set guid
     *
     * @param guid $guid
     * @return Webressource
     */
    public function setGuid($guid)
    {
        $this->guid = $guid;

        return $this;
    }

    /**
     * Get guid
     *
     * @return guid 
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * Set category
     *
     * @param string $category
     * @return Webressource
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Webressource
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set href
     *
     * @param string $href
     * @return Webressource
     */
    public function setHref($href)
    {
        $this->href = $href;

        return $this;
    }

    /**
     * Get href
     *
     * @return string 
     */
    public function getHref()
    {
        return $this->href;
    }

    /**
     * Set rating
     *
     * @param integer $rating
     * @return Webressource
     */
    public function setRating($rating)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating
     *
     * @return integer 
     */
    public function getRating()
    {
        return $this->rating;
    }


    /**
     * Set user
     *
     * @param \Bytedoc\Bundle\Gps\Entity\User $user
     * @return Webressource
     */
    public function setUser(\Bytedoc\Bundle\Gps\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bytedoc\Bundle\Gps\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
