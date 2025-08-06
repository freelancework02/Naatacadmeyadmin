import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const KalamTable = () => {
    const [kalams, setKalams] = useState([]);

    const fetchKalams = async () => {
        const res = await fetch('http:localhost:5000/api/kalamssub');
        const data = await res.json();
        setKalams(data);
    };

    useEffect(() => {
        fetchKalams();
    }, []);

    const handleApprove = async (id) => {
        await fetch(`http:localhost:5000/api/kalamssub/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Approved: 0 })
        });
        fetchKalams();
    };

    const handleDelete = async (id) => {
        await fetch(`http:localhost:5000/api/kalamssub/${id}`, { method: 'DELETE' });
        fetchKalams();
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(kalams);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Kalam Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'Kalam_Submissions.xlsx');
    };

    return (
        <div className="p-6 shadow rounded bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Kalam Submissions</h2>
                <button onClick={exportToExcel} className="bg-blue-600 text-white px-4 py-2 rounded">Export to Excel</button>
            </div>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Poet Name</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">City</th>
                        <th className="border px-4 py-2">Approved</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {kalams.map(kalam => (
                        <tr key={kalam.id}>
                            <td className="border px-4 py-2">{kalam.id}</td>
                            <td className="border px-4 py-2">{kalam.poet_name}</td>
                            <td className="border px-4 py-2">{kalam.kalam_title}</td>
                            <td className="border px-4 py-2">{kalam.city}</td>
                            <td className="border px-4 py-2">{kalam.Approved === 0 ? 'Yes' : 'No'}</td>
                            <td className="border px-4 py-2 space-x-2">
                                {kalam.Approved !== 0 && (
                                    <button onClick={() => handleApprove(kalam.id)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                                )}
                                <button onClick={() => handleDelete(kalam.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MazmoonTable = () => {
    const [mazmoons, setMazmoons] = useState([]);

    const fetchMazmoons = async () => {
        const res = await fetch('http:localhost:5000/api/mazmoonssub');
        const data = await res.json();
        setMazmoons(data);
    };

    useEffect(() => {
        fetchMazmoons();
    }, []);

    const handleApprove = async (id) => {
        await fetch(`http:localhost:5000/api/mazmoonssub/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Approved: 0 })
        });
        fetchMazmoons();
    };

    const handleDelete = async (id) => {
        await fetch(`http:localhost:5000/api/mazmoonssub/${id}`, { method: 'DELETE' });
        fetchMazmoons();
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(mazmoons);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Mazmoon Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'Mazmoon_Submissions.xlsx');
    };

    return (
        <div className="p-6 shadow rounded bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Mazmoon Submissions</h2>
                <button onClick={exportToExcel} className="bg-blue-600 text-white px-4 py-2 rounded">Export to Excel</button>
            </div>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Writer Name</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">City</th>
                        <th className="border px-4 py-2">Approved</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mazmoons.map(mazmoon => (
                        <tr key={mazmoon.id}>
                            <td className="border px-4 py-2">{mazmoon.id}</td>
                            <td className="border px-4 py-2">{mazmoon.name}</td>
                            <td className="border px-4 py-2">{mazmoon.mazmoon_title}</td>
                            <td className="border px-4 py-2">{mazmoon.city}</td>
                            <td className="border px-4 py-2">{mazmoon.Approved === 0 ? 'Yes' : 'No'}</td>
                            <td className="border px-4 py-2 space-x-2">
                                {mazmoon.Approved !== 0 && (
                                    <button onClick={() => handleApprove(mazmoon.id)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                                )}
                                <button onClick={() => handleDelete(mazmoon.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { KalamTable, MazmoonTable };
