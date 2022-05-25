import React, {useState} from 'react'
import { PuppyType } from '../../types'
import AddForm from '../AddForm/AddForm';
import Card from '../Card/Card'
import './Gallery.css'

interface GalleryPropsComponentType {
  puppiesData: PuppyType[];
}

const Gallery = ({puppiesData}: GalleryPropsComponentType) => {

  const[addClick, setAddClick] = useState(false)

  const addHandler = () => {
    // e.preventDefault()
    setAddClick(!addClick);
  }

  return (<>
    <button onClick={addHandler}>Add new puppy</button>
    { addClick && <AddForm />}
    <section className="gallery">
    {puppiesData.map((puppy: PuppyType, i: React.Key | null | undefined) => {
        return <Card key={i} puppy={puppy} />
    })}
    </section>
  </>
  )
}

export default Gallery