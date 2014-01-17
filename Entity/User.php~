<?php
namespace Bytedoc\Bundle\Gps\Entity;

use Symfony\Component\Security\Core\User\UserInterface;

class User implements UserInterface, \Serializable
{
    private $id;

    private $username;

    private $salt;

    private $password;

    private $email;

    private $isActive;
	
	// /**
 //     * @var \Doctrine\Common\Collections\Collection
 //     */
 //    private $webressources;

 //    /**
 //     * @var \Doctrine\Common\Collections\Collection
 //     */
 //    private $books;

	
	/**
	 * Copy attributes from another object
	 * @param User $copy
	 * @return User
	 */
	 public function copyAllAttributes($copy)
	 {
		 $this->setUsername($copy->getUsername());
		 $this->setEmail($copy->getEmail());
		 
		 return $this;
	 }
	
    public function __construct()
    {
        $this->isActive = true;
        $this->salt = md5(uniqid(null, true));
		
		// $this->webressources = new ArrayCollection();
        // $this->books = new ArrayCollection();
    }

    /**
     * @inheritDoc
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @inheritDoc
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @inheritDoc
     */
    public function getRoles()
    {
		// TODO assign only certain roles, make them part of the database user table
		$roles = array('ROLE_GPS_USER');
		if($this->username == 'Max') {
			array_push($roles, 'ROLE_GPS_ADMIN');
		}
        return $roles;
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {
    }

    /**
     * @inheritDoc
     */
    public function equals(UserInterface $user)
    {
        return $this->id === $user->getId();
    }

    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
        ));
    }

    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
        ) = unserialize($serialized);
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
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return User
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     * @return User
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean 
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Add webressources
     *
     * @param \Bytedoc\Bundle\Gps\Entity\Webressource $webressources
     * @return User
     */
    public function addWebressource(\Bytedoc\Bundle\Gps\Entity\Webressource $webressources)
    {
        $this->webressources[] = $webressources;

        return $this;
    }

    /**
     * Remove webressources
     *
     * @param \Bytedoc\Bundle\Gps\Entity\Webressource $webressources
     */
    public function removeWebressource(\Bytedoc\Bundle\Gps\Entity\Webressource $webressources)
    {
        $this->webressources->removeElement($webressources);
    }

    /**
     * Get webressources
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getWebressources()
    {
        return $this->webressources;
    }

    /**
     * Add books
     *
     * @param \Bytedoc\Bundle\Gps\Entity\Book $books
     * @return User
     */
    public function addBook(\Bytedoc\Bundle\Gps\Entity\Book $books)
    {
        $this->books[] = $books;

        return $this;
    }

    /**
     * Remove books
     *
     * @param \Bytedoc\Bundle\Gps\Entity\Book $books
     */
    public function removeBook(\Bytedoc\Bundle\Gps\Entity\Book $books)
    {
        $this->books->removeElement($books);
    }

    /**
     * Get books
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBooks()
    {
        return $this->books;
    }
}
