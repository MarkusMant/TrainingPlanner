export function exportToCsv(filename, rows) {
    const processRow = (row) => {
        return row.map(String).map(v => v.replaceAll('"', '""')).map(v => `"${v}"`).join(',');
    };

    const csvContent = [
        Object.keys(rows[0]).join(','), // header row
        ...rows.map(row => processRow(Object.values(row)))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}