import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileUploadParser from '../../components/FileUpload/FileUploadParser';
import { DataProvider } from '../../contexts/DataContext';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { parseCSV } from '../../events/ParsingEvents';

// Mock parseCSV and rowToTransaction
jest.mock('../../events/ParsingEvents', () => ({
    parseCSV: jest.fn().mockResolvedValue('mockedResult'),
}));

// Mock uuidv4
jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('mockedId') }));

describe('FileUploadParser', () => {

    it('should render', () => {
        const dispatch = jest.fn();
        render(<DataProvider value={{ dispatch: dispatch }}><FileUploadParser /></DataProvider>);
        const header = screen.getByText('File Upload Parser');
        expect(header).toBeInTheDocument();
    });

}); 
