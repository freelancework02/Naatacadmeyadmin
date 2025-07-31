import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Layout from '../../../component/Layout';

const BazmeDuroodTable = () => {
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch('https://updated-naatacademy.onrender.com/api/bazmedurood')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(row => ({
      ID: row.id,
      'Full Name (Roman)': row.full_name_roman,
      'Country': row.country,
      'City': row.city,
      'Durood Count': row.durood_count,
      'Dua (Urdu)': row.dua,
      'Inserted Date': row.inserted_date,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bazm-e-Durood');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'bazmedurood_data.xlsx');
  };

  return (
    <Layout>
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold urdu-text text-orange-600">درود شریف کی فہرست</h2>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm text-gray-700 text-right">
            <tr>
              <th className="p-3">Sr</th>
              <th className="p-3 urdu-text">مکمل نام</th>
              <th className="p-3 urdu-text">ملک</th>
              <th className="p-3 urdu-text">شہر</th>
              <th className="p-3 urdu-text">تعداد</th>
              <th className="p-3 urdu-text">دعا</th>
              <th className="p-3">Inserted Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y text-right">
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">کوئی اندراج نہیں ملا</td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{item.full_name_roman}</td>
                  <td className="p-3">{item.country}</td>
                  <td className="p-3">{item.city}</td>
                  <td className="p-3">{item.durood_count.toLocaleString()}</td>
                  <td className="p-3 max-w-xs whitespace-pre-wrap urdu-text">{item.dua}</td>
                  <td className="p-3">{new Date(item.inserted_date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
    </Layout>
  );
};

export default BazmeDuroodTable;
