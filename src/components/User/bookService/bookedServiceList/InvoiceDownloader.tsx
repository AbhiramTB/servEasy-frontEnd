import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { BookingData } from '../../../../pages/user/BookService/BookedOfflineServicePage';

interface InvoiceDownloaderProps {
  bookingData: BookingData;
}

const InvoiceDownloader: React.FC<InvoiceDownloaderProps> = ({ bookingData }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatePDF = async () => {
      if (!invoiceRef.current) return;

      try {
        const dataUrl = await toPng(invoiceRef.current);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;
          pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('invoice.pdf');
        };
      } catch (error) {
        console.error('Failed to generate PDF', error);
      }
    };

    generatePDF();
  }, [bookingData]);

  const { service, serviceProvider, bookedService } = bookingData;

  const { address, bookedTime, payment, paymentStatus, paymentType, serviceStatus, _id: invoiceNumber } = bookedService;

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
      <div
        ref={invoiceRef}
        id="invoice"
        style={{
          width: '600px',
          padding: '32px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: '#fff',
          color: '#333',
          boxSizing: 'border-box',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ color: '#2563eb', margin: 0, fontWeight: 'bold' }}>SERVEASY</h1>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>Service Invoice</p>
          </div>

          {serviceProvider.profileImage ? (
            <img
              src={serviceProvider.profileImage}
              alt={`${serviceProvider.serviceProviderName} profile`}
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                color: '#2563eb',
                fontWeight: 'bold',
              }}
            >
              {serviceProvider.serviceProviderName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Invoice info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 14 }}>
          <div style={{ flex: 1, paddingRight: 16 }}>
            <h3 style={{ marginBottom: 8, borderBottom: '1px solid #e2e8f0', paddingBottom: 4, color: '#2563eb' }}>
              Customer Details
            </h3>
            <p style={{ margin: '4px 0' }}>
              <strong>Name:</strong> {address.name}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Address:</strong> {address.houseName}, {address.state} - {address.pincode}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Phone:</strong> {address.phone}
            </p>
          </div>

          <div style={{ flex: 1, paddingLeft: 16 }}>
            <h3 style={{ marginBottom: 8, borderBottom: '1px solid #e2e8f0', paddingBottom: 4, color: '#2563eb' }}>
              Service Provider Details
            </h3>
            <p style={{ margin: '4px 0' }}>
              <strong>Name:</strong> {serviceProvider.serviceProviderName}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Email:</strong> {serviceProvider.serviceProviderEmail}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Phone:</strong> {serviceProvider.serviceProviderPhone}
            </p>
          </div>
        </div>

        {/* Booking info */}
        <div style={{ marginBottom: 24, fontSize: 14 }}>
          <p>
            <strong>Invoice Number:</strong> {invoiceNumber}
          </p>
          <p>
            <strong>Booking Date:</strong> {new Date(bookedTime).toLocaleDateString()}
          </p>
          <p>
            <strong>Service:</strong> {service.serviceName}
          </p>
          <p>
            <strong>Service Status:</strong> {serviceStatus}
          </p>
          <p>
            <strong>Payment Status:</strong> {paymentStatus}
          </p>
          <p>
            <strong>Payment Type:</strong> {paymentType}
          </p>
        </div>

        {/* Payment Breakdown Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#2563eb', color: '#fff' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Service Cost</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.serviceCost?.toFixed(2) ?? '0.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Material Cost</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.materialCost?.toFixed(2) ?? '0.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Travel Cost</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.travelCost?.toFixed(2) ?? '0.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Inspection Cost</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.inspectionCost?.toFixed(2) ?? '0.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Convenience Fee</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.convenienceFee?.toFixed(2) ?? '0.00'}
              </td>
            </tr>
            <tr style={{ fontWeight: 'bold', backgroundColor: '#f3f4f6' }}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total Paid</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                {payment?.total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
          Thank you for choosing Serveasy. We appreciate your business!
        </p>
      </div>
    </div>
  );
};

export default InvoiceDownloader;
