import React, { useState, useEffect } from 'react';

const TestMarkdownLoading: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/personal/posts/post-1.md');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        setResult(`Failed to fetch: ${response.status} ${response.statusText}`);
        return;
      }
      
      const text = await response.text();
      console.log('Fetched text:', text);
      setResult(text);
    } catch (error) {
      console.error('Fetch error:', error);
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testFetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Markdown Loading</h1>
      
      <button 
        onClick={testFetch}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Test Fetch'}
      </button>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Result:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap">
          {result}
        </pre>
      </div>
    </div>
  );
};

export default TestMarkdownLoading;