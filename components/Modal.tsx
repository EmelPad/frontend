// import React from 'react'

// interface ModalProps {
//     isModalOpen: boolean;
//     setIsModalOpen: (value: boolean) => void;
//     isLoading: boolean;
//     collectionFound: string;
//     notFound: boolean;
// }


// const Modal = ({isModalOpen, setIsModalOpen, isLoading, collectionFound, notFound}: ModalProps) => {
//   return (
//     <div>
//         {isModalOpen && (
//   <div className="fixed inset-0 bg-black/60 z-50 flex flex-col">
//     <div className="w-full max-w-6xl mx-auto bg-[#111] text-white rounded-b-2xl mt-20">

//         <div className="flex items-center justify-between">


//       {isLoading && (
//         <div className="text-center py-2">Searching...</div>
//       )}

//       {!isLoading && notFound && (
//         <div className="text-center py-2 text-red-400 text-xl">
//           Collection not found ❌
//         </div>
//       )}

//       {/* just display only address */}
//       {!isLoading && collectionFound && (
//         <div className="py-2">
//           {/* <h2 className="text-2xl font-semibold">{collection.name}</h2> */}
//           <p>Address: {collectionFound}</p>

//           {/* <p>Items: {collection.totalSupply}</p> */}

//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="px-5 py-2 bg-white text-black rounded-full"
//         >
//           Close
//         </button>
//       </div>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   )
// }

// export default Modal;