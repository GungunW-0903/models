import {Link ,useParams,Navigate} from "react-router-dom";
import {useState} from "react";


export function PlacesPage(){
    const {action} =useParams();
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setaddedPhotos]=useState([]);
    const[photoLink,setPhotoLink]=useState('');
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState([]);
    const[extraInfo,setExtraInfo]=useState('');
    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    const[maxGuests,setMaxGuests]=useState(1);
    const [redirect,setRedirect]=useState(false);
    const [places,setPlaces]=useState([]);
//  async function addPhotoByLink(ev){
//    ev.preventDefault();
//    const {data:filename} =await axios.post('/upload-by-link',{
//      setaddedPhotos(prev=>{
//     return [...prev,response];
//    setPhotoLink('');

//    })
//  }
//        useEffect(()=>{
//         const response=  fetch("http://127.0.0.1:8080/upload-by-link", {
    
//     // Adding method type
//     method: "POST",
    
//     // Adding body or contents to send
//     body: JSON.stringify({
//        link:link,
//     }),
    
//     // Adding headers to the request
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
//        });
//         }


    function handleCbClick(ev){
         // if(!ev || !ev.target){
         //    console.error('Invalid event object:',ev);
         //    return;
         // }

         const {checked , name} = ev.currentTarget;
         if(checked){
            setPerks(prev=>[...prev,name]);
         }else{
            setPerks(prev=>[...prev.filter(p=>p!=name)]);
         }

    }

    async function addNewPlace(ev){
        ev.preventDefault();
         const placeData={
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
         }
         try{
         
        const response=await fetch("http://127.0.0.1:8080/places", {
    
    // Adding method type
    method: "POST",
    
    // Adding body or contents to send
    body: JSON.stringify({
         ...placeData
    }),
    
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
        
      
});
    if(!response.ok){
      throw new Error('Failed to create place');
    }
   }catch(err){
      console.log("POST failed",err);
   }
setRedirect(true);


}
if(redirect){
   return <Navigate to={'/account/places'} />}
    
  
   
  


    
    
    return(
        <div>
       {action !== 'new' && (
        <div className="text-center">
        
           <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full font-semibold" to ={'/account/places/new'}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
          Add new place
           </Link>
       </div>
       )}
     {action === 'new' &&(
        <div>
            <form onSubmit={addNewPlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-sm text-gray-500">Title for your place,should be short and catchy as in advertisement</p>
                <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="title, for example:My lovely apt" className="w-full py-2 px-3 max-w-auto overflow-visible border border-gray-300 shadow-md shadow-gray-300 rounded-full"  />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-sm text-gray-500">Address to this place</p>
                <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Address" className="w-full py-2 px-3 max-w-auto overflow-visible border border-gray-300 shadow-md shadow-gray-300 rounded-full" />
                 <h2 className="text-2xl mt-4">Photos</h2>
                 <p className="text-gray-500 text-sm">more = better</p>
                 <div className="flex gap-2">
                 <input type="text" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder={'Add using a link ....jpg'} className="w-full  py-2  border border-gray-300 shadow-md shadow-gray-300 rounded-full" />
                 <button type="button" onClick={(ev)=>{
                     ev.preventDefault();
                     setaddedPhotos([...addedPhotos,photoLink]);
                     setPhotoLink('');
                 }} className="bg-gray-200 rounded-2xl grow px-4 font-semibold" >Add&nbsp;photo</button>
                

                  
                 </div >
                 <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length >0 && addedPhotos.map(link=>(
                    <div className="h-32 flex " key={link}>
                        <img className="rounded-2xl w-full px-1 object-cover position-center" src={link} alt="" />
                         </div>
                    ))}
                 <button className=" flex justify-center gap-1  border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>

                    Upload
                 </button>
                 
                 </div>
                 <h2 className="text-2xl mt-4">Description</h2>
                 <p className="text-gray-500 text-sm">Description of the place</p>
                 <textarea value={description} onChange={ev=>setDescription(ev.target.value)} className="w-full py-5 px-3 border border-gray-300 shadow-md shadow-gray-300 rounded-3xl" />
                 <h2 className="text-2xl mt-4">Perks</h2>
                 <p className="text-gray-500 text-sm">Select all the perks of your place</p>
                 <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="wifi" onChange={()=> handleCbClick} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
</svg>

                        <span>Wifi</span>
                    </label>
                     <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="parking" onChange={()=> handleCbClick} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

                        <span>Free parking spot</span>
                    </label>
                     <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="tv" onChange={()=> handleCbClick} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
</svg>

                        <span>TV</span>
                    </label>
                    <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="radio"  onChange={()=> handleCbClick} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>
                         <span>Radio</span>
                    

                    </label>
                     <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="pets"  onChange={()=> handleCbClick} />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>


                        <span>Pets</span>
                    </label>
                     <label className="border border-gray-300 shadow-md shadow-gray-300 rounded-2xl p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="entrance"  onChange={()=> handleCbClick} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
</svg>

                       

                        <span>Private Entrance</span>
                    </label>
                 </div>
                   <h2 className="text-2xl mt-4">Extra Info</h2>
                 <p className="text-gray-500 text-sm">house rules,etc</p>
                 <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} className="w-full py-5 px-3 border border-gray-300 shadow-md shadow-gray-300 rounded-3xl" />
                 <h2 className="text-2xl mt-4">Check in &out times</h2>
                 <p className="text-gray-500 text-sm">Add check in and out times , remember to have some time window for cleaning the room between guests</p>
                 <div className="gap-2 grid sm:grid-cols-3">
                    <div>
                       <h3 className="mt-2 -mb-1 font-bold">Check in time</h3>
                       <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="14" className="gap-3 w-full py-2 px-3  border border-gray-300 shadow-md shadow-gray-300 rounded-2xl" />
                    </div>
                    <div>
                         <h3 className="mt-2 -mb-1 font-bold">Check out time</h3>

                         <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="11" className="gap-3 w-full py-2 px-3   border border-gray-300 shadow-md shadow-gray-300 rounded-2xl"  />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 font-bold">Max number of guests</h3>
                       <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} className="gap-3 w-full py-2 px-3  border border-gray-300 shadow-md shadow-gray-300 rounded-2xl"  />
                    </div>
                 </div>
                 <div>
                    <button className="bg-primary justify-center rounded-full w-full text-white py-2 my-4 font-bold">Save</button>
                 </div>
            </form>
        </div>
     ) }
     </div>
    )
   }

