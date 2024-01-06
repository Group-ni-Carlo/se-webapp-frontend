//----------------------------- Events Page UI -------------------------------------------//
import React, { useState,  useEffect, Fragment } from 'react'
import axios from 'axios';
import Header from '../Header/';
import { Link } from 'react-router-dom';
import placeholderImg from './placeholder.jpg';

function UIcode() {
    let [cardIndex, setCardIndex] = useState(0)
    let [currentIndex, setCurrentIndex] = useState(0);
    let [expandCard, setExpandCard] = useState([]);
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [image, setImage] = useState(null);
    let [isAdmin, setIsAdmin] = useState(false);
    let [cards, setCards] = useState([]);
    let [imgSrc, setImgSrc] = useState(null)

    let addCardIndex = () => {
        setCardIndex(cardIndex + 1)
    }

    let adminCheck = () => {
        setIsAdmin((prevIsAdmin) => !prevIsAdmin);
      };

    let nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
    
    let prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
      
    let limitDisplayText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    let updateTitle = (e) => {
        setTitle(e.target.value);
    };

    let updateContent = (e) => {
        setContent(e.target.value);
    };

    let updateImage = (e) => {
        setImage(e.target.files[0]);
    };

    let clearInputFields = () => {
        setImage(null)
    }

    let cardNo = 0

    let nnn = () => {
        console.log('Title:', title,'\nContent:', content, '\nImage:', image)
    }

    // This is the server fetch data code
    // let [data, setData] = useState([]);

    // useEffect(() => {
    //   let fetchData = async () => {
    //       //console.log(data)
    //     try {
    //       let response = await axios.get('http://localhost:3001/getData'); 
    //       setData(response.data.data);

    //     } catch (error) {
    //       console.error('Error fetching data from the backend:', error);
    //     }
    //   };
  
    //   fetchData();
  
    //   // refresh rate
    //   let interval = setInterval(fetchData, 2000);
    //   return () => clearInterval(interval);
    // }, []);

    //Send data to DB (works except for image)
    let sendData = async () => {
        
        // let imageUpload = new FormData(
        //     imageUpload.append('eventImage', image)
        // )
        let contextUpload = {
            eventTitle: title,
            eventCont: content
        };
        try {
            let response = await axios.post('http://localhost:3001/addData', contextUpload);
            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('Error sending data to backend:', error.response);
        }
    };


    //Slider array
    let slides = [
        placeholderImg,
        placeholderImg,
        placeholderImg,
        placeholderImg,
        placeholderImg,
    ];
    let proxyTitle = 'LOREM IPSUM'
    let proxyContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate risus vel mauris tincidunt convallis. Curabitur congue diam eget lacinia ultricies. Duis dictum ligula nunc. Suspendisse at varius leo, vel commodo magna. Duis venenatis nisi nibh, ac ultrices urna varius quis. Curabitur euismod sollicitudin fringilla. Praesent sed varius mi. Mauris tempus eget orci vel pretium. Morbi in tempus justo, feugiat vehicula ante. Cras elementum erat vitae dui euismod, eget rutrum sapien tristique. Curabitur at lorem eu enim pulvinar auctor. Curabitur dignissim vitae ipsum vitae suscipit. Donec elementum mauris sit amet fringilla posuere. Vivamus tempus molestie vehicula.'
    let addNewCard = () => {
        let newCard = {
          imgSrc: image? image : placeholderImg,
          cardTitle: title? title : proxyTitle,
          contentText: content? content : proxyContent,
        };
    
        setCards([...cards, newCard]);
    };

    let deleteCard = (cardIndex) => {
        let updatedCards = cards.filter((_, index) => index !== cardIndex);
        setCards(updatedCards);
    };

    // Slider Config
    let sliderFrameSpan = `${(100 / 5)}%`;
    let sliderTextFormat = "text-black mt-3 mb-3 ml-4 mr-4 max-w-xs break-words"

    
    function postEvent(){
        clearInputFields()
        addNewCard()
        sendData()
    }
    console.log("Card Number " + cardNo)
    // Card config
    let Card = ({ card, onEdit, imgSrc, cardTitle, contentText, cardIndex, onExpandCard, onDeleteCard }) => {
        let [clickedView, setClickedView] = useState(false);
        let [verticalOrientation, setVerticalOrientation] = useState(false);
        let [isEditing, setIsEditing] = useState(false);
        let [cardtitle, setCardTitle] = useState(card? card.cardTitle: '');
        let [cardContent, setCardContent] = useState(card? card.cardContent: '');

        // useEffect(() => {
        //     setEditedTitle(cardTitle);
        //     setEditedContent(contentText);
        // }, [cardTitle, contentText]);

        let toggleClickedView = () => {
            setClickedView(!clickedView);
            onExpandCard(cardIndex);
        }

        let deleteEvent = (event) => {
            event.stopPropagation();
            onDeleteCard(cardIndex);
        };

        let editEvent = () => {
            setIsEditing(!isEditing);
        };

        let newTitle = (e) => {
            setCardTitle(e.target.value);
        };
    
        let newContent = (e) => {
            setCardContent(e.target.value);
        };

        let saveChanges = () => {
            setIsEditing(false);
        };

        // let onEditCard = () => {
        //    onEdit({...card, cardTitle, cardContent})
        // } 

        return(
            <Fragment>
                <div className="lg:flex items-center m-3 w-auto h-${clickedView ? 'full' : '80'} rounded-lg overflow-hidden bg-neutral-100" onClick={toggleClickedView}>
                        {isEditing ? (
                            <div>
                                <input type="editedtext" id="title" value={cardTitle} onChange={newTitle} placeholder="Add Title" className="w-full mb-4 px-3 py-2 border rounded-md"/>
                                <textarea id="editedcontent" name="content" value={cardContent} onChange={newContent} placeholder="Add Content" className="w-full mb-4 px-3 py-2 border rounded-md" rows="4"/>
                                <button className="px-2 py-1 ml-4 mt-4 bg-white hover:bg-gray-200 rounded-lg" onClick={saveChanges}>Save</button>
                            </div>
                        ):(
                            <div>
                                {isAdmin && (
                                    <div>
                                        <button className ="px-2 py-1 ml-4 mt-4 bg-white hover:bg-gray-200 rounded-lg" onClick={deleteEvent}>Delete Post</button>
                                        <button className ="px-2 py-1 ml-10 mt-4 bg-white hover:bg-gray-200 rounded-lg" onClick={editEvent}>Edit Post</button>
                                    </div>
                                )}
                                <div id="eventCard" className="lg:flex lg:w-full flex -col items-cem-3 w-auto rounded-lg bg-transparent">
                                    <div className="px-2 py-2 xs:w-1/4 sh:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 overflow-hidden">
                                        <img className="mx-auto w-full h-auto xs:h-full sh:h-full md:h-full lg:h-full xl:h-full object-cover rounded-md" src={imgSrc} alt="Image" />
                                    </div>
                                    <div className={`m-3 px-6 py-4 lg:w-2/3 overflow-hidden relative ${verticalOrientation ? '' : 'lg:order-2'}`}>
                                        <div className="font-bold text-xl m-3">{cardTitle}</div>
                                        <div className={`text-black overflow-hidden break-words ${clickedView ? '' : 'line-clamp-3'}`}>
                                            {contentText}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            </Fragment>
        );
    };

    

    let CardsArray = () => {
        let toggleExpandCard = (cardIndex) => {
            setExpandCard((prevExpandCard) => {
                let fullCardContext = prevExpandCard.includes(cardIndex);
                return fullCardContext ? prevExpandCard.filter((index) => index !== cardIndex) : [...prevExpandCard, cardIndex]
            });
        };
    };


  return (
    <Fragment>
            <div>
                <div><Header/></div>
                {/* Top bar code -Done */}
    
                <input type="checkbox" checked={isAdmin} onChange={adminCheck}/>Admin?

                {/* events banner -Done*/}
                <div className="relative z-0">
                    <div className="fixed text-6xl m-4 md:m-8 lg:m-12 text-primary-700 z-10 justify-center">EVENTS</div>
                    <div className="fixed w-full h-full items-center overflow-hidden justify-center bg-black"></div>
                </div>

                {/* transparent spacer */}
                <div className="bg-transparent h-40 w-full"></div>

                {/* float over main background frame */}
                <div className="relative bg-transparent z-20 items-center sm:ml-5 sm:mr-5 md:ml-15 md:mr-15 lg:ml-20 lg:mr-20 xl:ml-40 xl:mr-40">
                    {/* transparent spacer */}
                    <div className="bg-transparent h-3 w-full"></div>
                    {/* ----------------------------Add New Event Form------------------------------------ */}
                    {isAdmin && (
                        <div className="m-7 px-6 py-6 items-center rounded-lg bg-orange-500">
                            <input type="text" id="title" value={title} onChange={updateTitle} placeholder="Add Title" className="w-full mb-4 px-3 py-2 border rounded-md"/>
                            <textarea id="content" name="content" value={content} onChange={updateContent} placeholder="Add Content" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4"/>
                            <input type="file" id="image" name="eventImg" onChange={updateImage} enctype="multipart/form-data" className="mb-4 px-3 py-2 bg-transparent text-white rounded-md"/>

                            <button onClick={postEvent} className="bg-black rounded-lg ml-5 text-white px-4 py-2 mt-4">Post Event</button>
                        </div>
                    )}
                    {/* ------------------------------------------------------------------------------- */}


                    {/* latest events (Slider)-Done*/}
                    <div className="m-4 items-center rounded-lg bg-orange-500">
                        <div className="relative w-full w-auto mx-auto overflow-hidden">
                            <div className="flex m-3 transition-transform duration-300 ease-in-out transform translate-x-full" style={{ width: `${slides.length * 100}%`, transform: `translateX(-${currentIndex * (100 / slides.length)}%)` }}>
                                {slides.map((slide, index) => (
                                    <div key={index} style={{ width: sliderFrameSpan }} className="bg-transparent mr-5 p-3 flex">
                                        <div className="max-w-xs sm:hidden sh:hidden xl:hidden md:hidden right-1/2">
                                            {/* XS */}
                                            <img src={slide} className="w-auto h-40 object-cover m-2 mb-0" alt={`Slide ${index + 1}`}/>
                                            <div className="flex flex-shrink-0 items-center justify-center">
                                                <div className="font-bold text-2xl mt-4 mb-3 ml-4 mr-4">{limitDisplayText(title, 10)}</div>
                                            </div>
                                        </div>
                                        <div className="hidden sh:flex sm:hidden xs:hidden xl:hidden md:hidden">
                                            {/* SH */}
                                            <img src={slide} className="w-auto h-40 object-cover right-0 cover m-2" alt={`Slide ${index + 1}`}/>
                                            <div className="bg-transparent hover:bg-black-100">
                                                    <div className="font-bold text-xl mt-4 mb-3 ml-4 mr-4">{limitDisplayText(title, 20)}</div>
                                                    <div className={sliderTextFormat}>{limitDisplayText(content, 50)}</div>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex xs:hidden sh:hidden xl:hidden md:hidden">
                                            {/* SM */}
                                            <img src={slide} className="w-auto h-50 object-cover right-0 cover m-2" alt={`Slide ${index + 1}`}/>
                                            <div className="bg-transparent hover:bg-black-100">
                                                    <div className="font-bold text-xl mt-4 mb-3 ml-4 mr-4">{limitDisplayText(title, 15)}</div>
                                                    <div className={sliderTextFormat}>{limitDisplayText(content, 75)}</div>
                                            </div>
                                        </div>
                                        <div className="flex relative">
                                            <div className="hidden md:flex xl:hidden sh:hidden xs:hidden sm:hidden">
                                                {/* MD */}
                                                <img src={slide} className="w-auto h-60 object-cover m-2 ml-6" alt={`Slide ${index + 1}`}/>
                                                <div className="bg-transparent hover:bg-black-100">
                                                    <div className="font-bold text-xl mt-4 mb-3 ml-4 mr-4">{limitDisplayText(title, 20)}</div>
                                                    <div className={sliderTextFormat}>{limitDisplayText(content, 100)}</div>
                                                </div>
                                            </div>
                                            <div className="hidden xl:flex md:hidden sh:hidden xs:hidden sm:hidden ml-8">
                                                {/* XL */}
                                                <img src={slide} className="w-auto h-80 object-cover m-2 ml-10" alt={`Slide ${index + 1}`}/>
                                                <div className="bg-transparent hover:bg-black-100">
                                                    <div className="font-bold text-xl mt-4 mb-3 ml-10 mr-4">{limitDisplayText(title, 25)}</div>
                                                    <div className={sliderTextFormat}>{limitDisplayText(content, 300)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div></div>
                            <button onClick={prevSlide} className="absolute ml-3 opacity-75 text-2xl hover:bg-gray-400 top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-gray-300 text-white rounded-full">&#10094;</button>
                            <button onClick={nextSlide} className="absolute mr-3 opacity-75 text-2xl hover:bg-gray-400 top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-gray-300 text-white rounded-full">&#10095;</button>
                        </div>
                    </div>

                    {/* Generate Card Code */}
                    <div className="m-7">
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                cardIndex={index}
                                imgSrc={card.imgSrc}
                                cardTitle={card.cardTitle}
                                contentText={card.contentText}
                                onExpandCard={CardsArray}
                                onDeleteCard={deleteCard}
                                
                            />
                        ))}
                    </div>

                </div>
            </div>
    </Fragment>
    
  )
}

// ---------------------Exports--------------------------------------
export default UIcode
