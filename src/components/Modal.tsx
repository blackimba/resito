import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50'>
            <div className='bg-white rounded shadow-lg p-6 w-full max-w-sm relative'>
                <button
                    className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl'
                    onClick={onClose}
                    aria-label='Close modal'
                >
                    x
                </button>
                {title && <h2 className='text-lg font-bold mb-4'>{title}</h2>}
                {children}
            </div>
        </div>
    );
}

export default Modal;