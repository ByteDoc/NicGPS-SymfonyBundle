<?php
namespace Bytedoc\Bundle\Gps\Entity;

class Book
{
    protected $id;

    protected $category;

    protected $title;

    protected $author;

    protected $href_book;

    protected $href_reference;

    protected $notes;

    /**
     * @var \Bytedoc\Bundle\Gps\Entity\User
     */
    private $user;


	/**
	 * Copy attributes from another object
	 * @param Book $copy
	 * @return Book
	 */
	public function copyAllAttributes($copy)
	{
		$this->setCategory($copy->getCategory());
        $this->setTitle($copy->getTitle());
        $this->setAuthor($copy->getAuthor());
		$this->setHrefBook($copy->getHrefBook());
		$this->setHrefReference($copy->getHrefReference());
		$this->setNotes($copy->getNotes());
		
		return $this;
	}

    /**
     * Set Default Attribute Values
     * @return Book
     */
    public function setDefaultAttributes()
    {
        $this->setCategory("");
        $this->setTitle("");
        $this->setAuthor("");
        $this->setHrefBook("");
        $this->setHrefReference("");
        $this->setNotes("");
        
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
     * Set title
     *
     * @param string $title
     * @return Book
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
     * Set category
     *
     * @param string $category
     * @return Book
     */
    public function setCategory($category)
    {
        if(isset($category))
        {
            $this->category = $category;
        }

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
     * Set author
     *
     * @param string $author
     * @return Book
     */
    public function setAuthor($author)
    {
        if(isset($author))
        {
            $this->author = $author;
        }

        return $this;
    }

    /**
     * Get author
     *
     * @return string 
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set href_book
     *
     * @param string $hrefBook
     * @return Book
     */
    public function setHrefBook($hrefBook)
    {
        if(isset($hrefBook))
        {
            $this->href_book = $hrefBook;
        }

        return $this;
    }

    /**
     * Get href_book
     *
     * @return string 
     */
    public function getHrefBook()
    {
        return $this->href_book;
    }

    /**
     * Set href_reference
     *
     * @param string $hrefReference
     * @return Book
     */
    public function setHrefReference($hrefReference)
    {
        if(isset($hrefReference))
        {
            $this->href_reference = $hrefReference;
        }

        return $this;
    }

    /**
     * Get href_reference
     *
     * @return string 
     */
    public function getHrefReference()
    {
        return $this->href_reference;
    }

    /**
     * Set user
     *
     * @param \Bytedoc\Bundle\Gps\Entity\User $user
     * @return Book
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

    /**
     * Set notes
     *
     * @param string $notes
     * @return Book
     */
    public function setNotes($notes)
    {
        if(isset($notes))
        {
            $this->notes = $notes;            
        }

        return $this;
    }

    /**
     * Get notes
     *
     * @return string 
     */
    public function getNotes()
    {
        return $this->notes;
    }
}
