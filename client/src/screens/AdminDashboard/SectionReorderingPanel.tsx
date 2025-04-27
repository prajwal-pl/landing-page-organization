import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { getSectionOrder, updateSectionOrder } from "../../services/api";

interface SectionData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Custom styles to apply to draggable elements
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none", // Prevent text selection during drag
  padding: 16,
  margin: "0 0 8px 0",
  background: isDragging ? "#f0f9ff" : "#ffffff",
  border: isDragging ? "1px solid #93c5fd" : "1px solid #e5e7eb",
  borderRadius: "0.375rem",
  // Styles we need to apply on draggables
  ...draggableStyle,
});

export const SectionReorderingPanel: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{text: string; type: 'success' | 'error'} | null>(null);

  // Define section metadata
  const sectionDetails: Record<string, Omit<SectionData, 'id'>> = {
    hero: {
      title: "Hero Section",
      description: "Main landing section with headline and call to action",
      icon: "🏠"
    },
    ourStory: {
      title: "Our Story Section",
      description: "Background information about the organization",
      icon: "📖"
    },
    coachingServices: {
      title: "Coaching Services Section",
      description: "Overview of available coaching services",
      icon: "🧠"
    },
    meetCoach: {
      title: "Meet Our Coaches Section",
      description: "Profiles of coaches and their expertise",
      icon: "👨‍🏫"
    }
  };

  useEffect(() => {
    const fetchSectionOrder = async () => {
      try {
        setIsLoading(true);
        const data = await getSectionOrder();
        const sectionsWithDetails = data.sections.map((sectionId: string) => ({
          id: sectionId,
          ...sectionDetails[sectionId]
        }));
        setSections(sectionsWithDetails);
      } catch (err) {
        setError("Failed to load section order. Please try again.");
        console.error("Error fetching section order:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionOrder();
  }, []);

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    
    if (sourceIndex === destIndex) {
      return;
    }
    
    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(sourceIndex, 1);
    newSections.splice(destIndex, 0, reorderedItem);
    
    setSections(newSections);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage(null);
      const sectionIds = sections.map(section => section.id);
      await updateSectionOrder(sectionIds);
      setSaveMessage({ text: "Section order saved successfully! Opening homepage to preview changes.", type: "success" });
      
      // Open the homepage in a new tab after successful save
      setTimeout(() => {
        // Get the base URL of the current page
        const baseUrl = window.location.origin;
        // Open the home page in a new tab
        window.open(baseUrl, '_blank');
      }, 1000); // Small delay to allow user to see the success message
      
    } catch (err) {
      setSaveMessage({ text: "Failed to save section order. Please try again.", type: "error" });
      console.error("Error saving section order:", err);
    } finally {
      setIsSaving(false);
      // Only clear success message if it's not overwritten by an error
      if (saveMessage?.type === "success") {
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading sections...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-500">
        {error}
        <Button 
          className="mt-4 bg-blue-600 hover:bg-blue-700" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reorder Landing Page Sections</CardTitle>
        <p className="text-sm text-gray-500">Drag and drop sections to change their order on the landing page.</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div className="p-4 flex items-center">
                            {/* Drag handle */}
                            <div 
                              {...provided.dragHandleProps} 
                              className="mr-4 p-2 rounded-md bg-gray-100 cursor-move"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 9H16M8 12H16M8 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            
                            {/* Content */}
                            <div className="mr-4 text-2xl">{section.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-medium">{section.title}</h3>
                              <p className="text-sm text-gray-500">{section.description}</p>
                            </div>
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        
        {saveMessage && (
          <div 
            className={`mb-4 p-4 rounded-md ${
              saveMessage.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {saveMessage.text}
          </div>
        )}
        
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Section Order"}
        </Button>
      </CardContent>
    </Card>
  );
};