<?php
namespace Bytedoc\Bundle\Gps\Entity;
use \DateTime;

class Goal
{
    protected $id;

    protected $title;

    protected $duedate;

    protected $progress;

    protected $notes;

    protected $hide;

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
        $this->setTitle($copy->getTitle());
        $this->setProgress($copy->getProgress());
        $this->setDueDate($copy->getDueDate());
		$this->setHide($copy->getHide());
        $this->setNotes($copy->getNotes());
		
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
     * @return Goal
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
     * Set progress
     *
     * @param integer $progress
     * @return Goal
     */
    public function setProgress($progress)
    {
        if(!isset($progress)) {
            $progress = 0;
        }
        $this->progress = $progress;

        return $this;
    }

    /**
     * Get progress
     *
     * @return integer 
     */
    public function getProgress()
    {
        return $this->progress;
    }

    /**
     * Set hide
     *
     * @param boolean $hide
     * @return Goal
     */
    public function setHide($hide)
    {
        if(!isset($hide)) {
            $hide = false;
        }
        $this->hide = $hide;

        return $this;
    }

    /**
     * Get hide
     *
     * @return boolean 
     */
    public function getHide()
    {
        return $this->hide;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Goal
     */
    public function setNotes($notes)
    {
        if(!isset($notes)) {
            $notes = "";
        }
        $this->notes = $notes;

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
     * Set user
     *
     * @param \Bytedoc\Bundle\Gps\Entity\User $user
     * @return Goal
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
     * Set duedate
     *
     * @param \DateTime $duedate
     * @return Goal
     */
    public function setDuedate($duedate)
    {
        if(is_string($duedate)) {
            $duedate = date_create_from_format('Ymd',$duedate);
        }
        $this->duedate = $duedate;

        return $this;
    }

    /**
     * Get duedate
     *
     * @return \DateTime 
     */
    public function getDuedate()
    {
        return $this->duedate; //->format('Ymd');
    }
}
