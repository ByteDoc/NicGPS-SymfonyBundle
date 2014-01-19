<?php
namespace Bytedoc\Bundle\Gps\Entity;

class Book
{
    protected $id;

    protected $category;

    protected $title;

    protected $author;

    protected $hrefbook;

    protected $hrefreference;

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
		$this->setHrefbook($copy->getHrefbook());
        $this->setHrefreference($copy->getHrefreference());
        $this->setHrefbooktext($copy->getHrefbooktext());
        $this->setHrefreferencetext($copy->getHrefreferencetext());
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
        $this->setHrefbook("");
        $this->setHrefreference("");
        $this->setHrefbooktext("");
        $this->setHrefreferencetext("");
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
     * Set hrefbook
     *
     * @param string $hrefbook
     * @return Book
     */
    public function setHrefbook($hrefbook)
    {
        if(isset($hrefbook))
        {
            $this->hrefbook = $hrefbook;
        }

        return $this;
    }

    /**
     * Get hrefbook
     *
     * @return string 
     */
    public function getHrefbook()
    {
        return $this->hrefbook;
    }

    /**
     * Set hrefreference
     *
     * @param string $hrefreference
     * @return Book
     */
    public function setHrefreference($hrefreference)
    {
        if(isset($hrefreference))
        {
            $this->hrefreference = $hrefreference;
        }

        return $this;
    }

    /**
     * Get hrefreference
     *
     * @return string 
     */
    public function getHrefreference()
    {
        return $this->hrefreference;
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



    /**
     * @var string
     */
    private $hrefbooktext;

    /**
     * Set hrefbooktext
     *
     * @param string $hrefbooktext
     * @return Book
     */
    public function setHrefbooktext($hrefbooktext)
    {
        if(isset($hrefbooktext))
        {
            $this->hrefbooktext = $hrefbooktext;
        }

        return $this;
    }

    /**
     * Get hrefbooktext
     *
     * @return string 
     */
    public function getHrefbooktext()
    {
        return $this->hrefbooktext;
    }

    /**
     * @var string
     */
    private $hrefreferencetext;


    /**
     * Set hrefreferencetext
     *
     * @param string $hrefreferencetext
     * @return Book
     */
    public function setHrefreferencetext($hrefreferencetext)
    {
        if(isset($hrefreferencetext))
        {
            $this->hrefreferencetext = $hrefreferencetext;
        }

        return $this;
    }

    /**
     * Get hrefreferencetext
     *
     * @return string 
     */
    public function getHrefreferencetext()
    {
        return $this->hrefreferencetext;
    }
}
