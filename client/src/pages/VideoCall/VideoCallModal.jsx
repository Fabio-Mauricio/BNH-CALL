import { FaPlusCircle } from "react-icons/fa";

const VideoCallModal = ({isHidden, setIsHidden, handleChange, searchedUsers, addContact}) => {
    return (
        <div className={`w-lvw h-lvh flex items-center justify-center bg-black/10 ${isHidden ? 'hidden' : ''}`} onClick={() => setIsHidden(true)} >
  <div className="w-10/12 md:w-5/12 p-5 h-80 shadow-xl z-50 flex flex-col items-center bg-white rounded-md" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl mt-4 font-semibold" >PESQUISE PELO CONTATO QUE DESEJA ADICIONAR:</h1>
        <input className="p-2 rounded-sm w-9/12 mt-2" type="text" placeholder="Procure por amigos" onChange={handleChange} />
        <div className="flex flex-col overflow-auto w-11/12 ">
         {searchedUsers.map((searchedUser) => {
            return (
                <div className="flex items-center gap-2 text-sm mt-3" key={searchedUser.id} >
                       <div className="w-14 aspect-square overflow-hidden rounded-full">
                           <img
                            src={searchedUser.photo}
                            alt="pessoa"
                            className="w-full h-full rounded-full object-cover object-center"
                            />
                        </div>
                        <p>{searchedUser.name}</p>
                        <button onClick={() => addContact(searchedUser.id)}>
                            <FaPlusCircle />
                        </button>
                    </div>
            )
         })

         }
    </div>
  </div>
</div>
    )
}

export default VideoCallModal