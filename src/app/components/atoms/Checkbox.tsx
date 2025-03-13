// チェックボックスコンポーネント
import React from 'react';
import { Prefecture } from '@/app/type/types';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    prefecture?: Prefecture;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, prefecture }) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-6 h-6 cursor-pointer"
            />
            <label className="text-lg">{prefecture?.prefName}</label>
        </div>
    )
}