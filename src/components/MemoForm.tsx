import React, {useState, useEffect} from "react";

type Memo = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    };

type MemoFormProps = {
    onAddMemo: (title: string, content: string) => void;
    editingMemo: Memo | null;
    onEditMemo: (memo: Memo) => void;
};

const MemoForm: React.FC<MemoFormProps> = ({
    onAddMemo,
    editingMemo,
    onEditMemo
}) => {
    const [title, setTitle] = useState<string>(editingMemo?.title || '');
    const [content, setContent] = useState<string>(editingMemo?.content || '');

    //編集モード時にフォームに既存データを設定
    useEffect(() => {
        if (editingMemo) {
            setTitle(editingMemo.title);
            setContent(editingMemo.content);
        }
        }, [editingMemo]);
        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingMemo) {
            onEditMemo({
            ...editingMemo,
            title,
            content
            });
        } else {
            onAddMemo(title, content);
        }
     // フォームリセット
        setTitle('');
        setContent('');
        };

    return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="メモのタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        }}
        />
        <textarea
        placeholder="メモの内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        }}
        />
        <button type="submit"
        style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            }}>
        {editingMemo ? '更新' : '追加'}
        </button>
    </form>
    );
};

export default MemoForm;
