import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-[#333333] text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Logo</div>
            <div>
               アカウント名：山田太郎
            </div>
        </header>
    );
};

export default Header;