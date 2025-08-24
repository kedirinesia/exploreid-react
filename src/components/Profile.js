import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin: 0 auto 20px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 10px 0 0 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f8f9fa;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e1e5e9;

  &:hover {
    background: #e9ecef;
  }
`;

const DangerButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
    box-shadow: 0 10px 20px rgba(220, 53, 69, 0.3);
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  border: 1px solid;
`;

const ErrorMessage = styled(Message)`
  background: #fee;
  color: #c33;
  border-color: #fcc;
`;

const SuccessMessage = styled(Message)`
  background: #efe;
  color: #363;
  border-color: #cfc;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Profile = () => {
  const { user, updateProfile, deleteAccount, logout, loading } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        // Import authService to fetch profile
        const authService = (await import('../services/authService')).default;
        const profile = await authService.getUserProfile();
        setProfileData(profile);
        
        // Update form data with profile data
        setFormData({
          username: profile.username || '',
          email: profile.email || '',
          password: '',
          confirmPassword: ''
        });
        
        setError('');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      username: profileData?.username || user?.username || '',
      email: profileData?.email || user?.email || '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: profileData?.username || user?.username || '',
      email: profileData?.email || user?.email || '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.email) {
      setError('Username and email are required');
      return false;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password && formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      await updateProfile(null, formData.username, formData.email, formData.password);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Refresh profile data
      const authService = (await import('../services/authService')).default;
      const profile = await authService.getUserProfile();
      setProfileData(profile);
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount(null);
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to delete account');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <Header>
            <Title>Profile Not Found</Title>
            <Subtitle>Please log in to view your profile</Subtitle>
          </Header>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  if (isLoadingProfile) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <Header>
            <Title>Loading Profile...</Title>
            <Subtitle>Please wait while we fetch your profile data</Subtitle>
          </Header>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <LoadingSpinner />
            <p>Fetching profile data...</p>
          </div>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Header>
          <Avatar>{profileData?.username?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}</Avatar>
          <Title>{profileData?.username || user?.username || 'Unknown User'}</Title>
          <Subtitle>{profileData?.email || user?.email || 'No email'}</Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </InputGroup>

          {isEditing && (
            <>
              <InputGroup>
                <Label htmlFor="password">New Password (optional)</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </InputGroup>
            </>
          )}

          {isEditing ? (
            <ButtonGroup>
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </PrimaryButton>
              <SecondaryButton type="button" onClick={handleCancel}>
                Cancel
              </SecondaryButton>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <PrimaryButton type="button" onClick={handleEdit}>
                Edit Profile
              </PrimaryButton>
              <SecondaryButton type="button" onClick={handleLogout}>
                Logout
              </SecondaryButton>
            </ButtonGroup>
          )}
        </Form>

        {!isEditing && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <DangerButton type="button" onClick={handleDeleteAccount}>
              Delete Account
            </DangerButton>
          </div>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 